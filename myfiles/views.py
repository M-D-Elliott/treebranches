from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render, HttpResponse
import json
from rest_framework.decorators import action
from rest_framework import status
from rest_framework import viewsets

from .models import DirObject
from .serializers import DirObjectSerializer
from .forms import PostForm, RenameForm


class ProjectViewSet(LoginRequiredMixin, viewsets.ModelViewSet):
    """This view provides list, detail, create, retrieve, update
    and destroy actions for Dir Objects."""
    model = DirObject
    serializer = DirObjectSerializer

    def list(self, request, *args, **kwargs):
        template = "myfiles/project.html"
        user = request.user
        session = user.get_or_create_session()
        context = {'user': user,
                   'session': session,
                   'postForm': PostForm(),
                   'renameForm': RenameForm()}
        return render(request, template, context=context)

    @action(methods=['post'], detail=True)
    def create(self, request, *args, **kwargs):
        """This method saves a new Dir Object (folder or file) to the database.
        It accepts an ajax request containing create data, previously 'stringified' by json.
        It serializes the data, fields: user, name, par_fldr, and ext.
        If the data is valid, this method returns a list of freshly assigned Dir Object primary keys, called ids.
        If the data is invalid this method returns the serializer errors through an HttpResponse."""
        data = json.loads(request.data['data'])
        data.pop()
        serializer = self.serializer(data=data, many=True, context={'request': request})
        response_data = {'result': 'Create successful!', 'return_ids': [], 'temp_ids': []}
        if serializer.is_valid():
            for new_object in serializer.save():
                return_id = new_object.format_id()
                response_data['return_ids'].append(return_id)
                response_data['temp_ids'].append(new_object.temp_id)
                new_object.clear_temp()
            return HttpResponse(json.dumps(response_data), content_type="application/json")
        else:
            return HttpResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['put'], detail=True)
    def update(self, request, *args, **kwargs):
        """This method updates a Dir Object (folder or file) in the database.
        It accepts an ajax request containing update data, previously 'stringified' by json.
        It removes the final item, a list of primary keys, called ids, and queries the database for identified objects.
        It serializes the data, fields: id, user, name, par_fldr, ext, and special, using the queryset.
        If the data is valid it returns a list of all updated Dir Object ids.
        If the data is invalid this method returns the serializer errors through an HttpResponse."""
        data = json.loads(request.data['data'])
        formatted_ids = data.pop()
        ids = [i.split('-')[1] for i in formatted_ids]
        queryset = request.user.myfiles_objects.filter(pk__in=ids)
        serializer = self.serializer(queryset, data=data, many=True, context={'request': request})
        response_data = {'result': 'Update successful!', 'return_ids': []}
        if serializer.is_valid():
            for updated_object in serializer.save():
                return_id = updated_object.format_id()
                response_data['return_ids'].append(return_id)
            return HttpResponse(json.dumps(response_data), content_type="application/json")
        else:
            return HttpResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['delete'], detail=True)
    def delete(self, request, *args, **kwargs):
        """This method deletes a Dir Object (folder or file) from the database.
        It accepts an ajax request containing delete data, previously 'stringified' by json.
        It serializes the data, fields: id
        If the data is valid it returns a list of all updated Dir Object primary keys, called ids.
        If the data is invalid..."""
        data = json.loads(request.data['data'])
        formatted_ids = data.pop()
        ids = [i.split('-')[1] for i in formatted_ids]
        requested_objects = request.user.myfiles_objects.filter(pk__in=ids)
        # force an error here by submitting a bad id, then do try catch to check it.
        response_data = {'result': 'Delete successful!', 'return_ids': []}
        if requested_objects:
            for requested_object in requested_objects:
                return_id = requested_object.format_id();
                response_data['return_ids'].append(return_id)
            requested_objects.delete()
            return HttpResponse(json.dumps(response_data), content_type="application/json")
        else:
            return HttpResponse('One or more objects does not exist.', status=status.HTTP_400_BAD_REQUEST)

