# Generated by Django 5.0.3 on 2024-07-10 12:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("trip", "0022_rename_accommondation_accommodation_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="trip",
            name="inclusions",
            field=models.JSONField(blank=True, null=True),
        ),
    ]