from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import DirObject

User = get_user_model()


class ParentValidationMixin:
    def find_parent(self, parent_id):
        parent = None
        if parent_id is not None:
            if 'temp' in parent_id:
                parent = self.context['request'].user.myfiles_objects.get(temp_id=parent_id)
            else:
                parent = self.context['request'].user.myfiles_objects.get(id=parent_id)
        return parent

    def validate_parent(self, data):
        """
        Check that the 'par_fldr'
        is a folder (ext='fldr', etc),
        """
        data['par_fldr'] = self.find_parent(data['par_fldr'])
        if data['par_fldr'] is not None:
            par_ext = data['par_fldr'].ext
            if not (par_ext == 'fldr' or par_ext == 'root' or par_ext == 'trash'):
                raise serializers.ValidationError("parent must be folder, root, or trash")
        return data


class DirObjectListSerializer(ParentValidationMixin, serializers.ListSerializer):
    def update(self, instance, validated_data):
        # Maps for id->instance and id->data item.
        dir_object_mapping = {dir_object.id: dir_object for dir_object in instance}
        data_mapping = {int(item['id']): item for item in validated_data}

        # Perform creations and updates.
        ret = []
        for dir_object_id, data in data_mapping.items():
            dir_object = dir_object_mapping.get(dir_object_id, None)
            self.validate_parent(data)
            if dir_object is None:
                ret.append(self.child.create(data))
            else:
                ret.append(self.child.update(dir_object, data))
        # Perform deletions.
        for dir_object_id, dir_object in dir_object_mapping.items():
            if dir_object_id not in data_mapping:
                dir_object.delete()

        return ret

    def to_internal_value(self, data):
        """
        List of dicts of native values <- List of dicts of primitive datatypes.
        """
        if serializers.html.is_html_input(data):
            data = serializers.html.parse_html_list(data)

        if not isinstance(data, list):
            message = self.error_messages['not_a_list'].format(
                input_type=type(data).__name__
            )
            raise serializers.ValidationError({
                serializers.api_settings.NON_FIELD_ERRORS_KEY: [message]
            }, code='not_a_list')

        if not self.allow_empty and len(data) == 0:
            if self.parent and self.partial:
                raise serializers.SkipField()

            message = self.error_messages['empty']
            raise serializers.ValidationError({
                serializers.api_settings.NON_FIELD_ERRORS_KEY: [message]
            }, code='empty')

        ret = []
        errors = []

        for item in data:
            try:
                # prepare child serializer to only handle one instance
                self.child.instance = self.instance.get(id=item['id']) if self.instance else None
                self.child.initial_data = item
                validated = self.child.run_validation(item)
            except serializers.ValidationError as exc:
                errors.append(exc.detail)
            else:
                ret.append(validated)
                errors.append({})

        if any(errors):
            raise serializers.ValidationError(errors)

        return ret


class DirObjectSerializer(ParentValidationMixin, serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        queryset=User.objects.filter(), slug_field='username', many=False
    )
    id = serializers.CharField(max_length=20, required=False)
    temp_id = serializers.CharField(max_length=20, default=None, required=False)
    par_fldr = serializers.CharField(max_length=20, required=False, default=None, allow_null=True, allow_blank=True)

    class Meta:
        model = DirObject
        fields = ('user', 'id',  'temp_id', 'par_fldr', 'name', 'ext', 'special', 'sort_term',)
        read_only_fields = ('user',)
        list_serializer_class = DirObjectListSerializer

    def __init__(self, *args, **kwargs):
        many = kwargs.pop('many', True)
        super(DirObjectSerializer, self).__init__(many=many, *args, **kwargs)

    def create(self, validated_data):
        self.validate_parent(validated_data)
        return super().create(validated_data)

