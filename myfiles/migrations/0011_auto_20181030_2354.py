# Generated by Django 2.0.7 on 2018-10-31 04:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myfiles', '0010_dirobject_temp_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dirobject',
            name='temp_id',
            field=models.CharField(blank=True, default='', max_length=20, null=True),
        ),
    ]
