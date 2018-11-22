from django.conf import settings
from django import forms

from . import models


class SpecialTextInput(forms.TextInput):

    def __init__(self, attrs=None):
        if attrs is not None:
            attrs = attrs.copy()
            self.input_type = attrs.pop('type', self.input_type)
            attrs['class'] = 'form-input ' + settings.APP_SERIAL
        super().__init__(attrs)


class PostForm(forms.ModelForm):

    class Meta:
        model = models.DirObject
        fields = ['name']

        widgets = {
            'name': SpecialTextInput(attrs={
                'id': 'post-input',
                'required': True,
                'placeholder': '',
                'autocomplete': 'off',
                'type': 'text',
                'value': '',
            }),
        }


class RenameForm(PostForm):

    widgets = {
        'name': SpecialTextInput(attrs={
            'id': 'rename-input',
            'required': True,
            'placeholder': '',
            'autocomplete': 'off',
            'type': 'text',
            'value': '',
        }),
    }