# Generated by Django 3.0.4 on 2020-04-22 01:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='description',
            field=models.CharField(max_length=255, null=True),
        ),
    ]