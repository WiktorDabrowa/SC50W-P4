# Generated by Django 4.0.5 on 2022-09-29 12:30

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0003_user_followers_user_is_following'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='is_following',
            field=models.ManyToManyField(related_name='followed_by', to=settings.AUTH_USER_MODEL),
        ),
    ]
