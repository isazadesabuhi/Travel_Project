# Generated by Django 5.0.3 on 2024-06-02 11:26

import django_countries.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0005_alter_user_countries_visited"),
    ]

    operations = [
        migrations.CreateModel(
            name="Country",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    django_countries.fields.CountryField(max_length=2, unique=True),
                ),
            ],
        ),
    ]
