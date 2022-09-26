from django.forms import ModelForm, Textarea
from .models import Post


class PostForm(ModelForm):
  class Meta:
    model = Post
    fields = ['body']
    labels = {
      'body': ''
    }
    widgets = {
      'body' : Textarea(attrs=
                        {'cols': 40,
                        'rows': 10,
                        'placeholder' : 'Got Something to say?'
                        })
    }