# Generated by Django 2.0.7 on 2018-10-03 04:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myfiles', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dirobject',
            name='is_root',
        ),
        migrations.AlterField(
            model_name='dirobject',
            name='ext',
            field=models.CharField(max_length=6),
        ),
    ]
