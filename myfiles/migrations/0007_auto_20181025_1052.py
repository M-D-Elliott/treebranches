# Generated by Django 2.0.7 on 2018-10-25 15:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myfiles', '0006_auto_20181025_1041'),
    ]

    operations = [
        migrations.RenameField(
            model_name='dirobject',
            old_name='sort_type',
            new_name='sort_term',
        ),
    ]
