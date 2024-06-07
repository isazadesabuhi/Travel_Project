# Generated by Django 5.0.3 on 2024-06-02 10:37

import django_countries.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0002_country_user_profile_picture_alter_user_username_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="country",
            name="name",
            field=django_countries.fields.CountryField(max_length=2),
        ),
        migrations.AlterField(
            model_name="user",
            name="countries_visited",
            field=models.ManyToManyField(blank=True, to="users.country"),
        ),
    ]