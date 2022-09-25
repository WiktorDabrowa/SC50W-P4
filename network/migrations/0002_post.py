# Generated by Django 4.0.5 on 2022-09-25 16:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('body', models.TextField(max_length=300)),
                ('likes', models.PositiveIntegerField(default=0)),
                ('poster', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
