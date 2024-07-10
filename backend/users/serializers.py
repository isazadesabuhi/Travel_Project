from rest_framework import serializers
from .models import User
from django_countries import countries
from django_countries.fields import Country

class CountriesField(serializers.Field):
    def to_representation(self, value):
        if not value:
            return []
        return [str(code) for code in value]  # Assuming value is a list of country codes

    def to_internal_value(self, data):
        if not data:
            return []
        return data  # Assuming data is already a list of country codes
    
class UserSerializer(serializers.ModelSerializer):
    countries_visited = CountriesField(required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'countries_visited', 'password']
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
            'email': {'required': False}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password' and value:
                instance.set_password(value)
            elif attr != 'password':
                setattr(instance, attr, value)
        instance.save()
        return instance


class PasswordUpdateSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(write_only=True, required=True)
    confirm_new_password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        if data['new_password'] != data['confirm_new_password']:
            raise serializers.ValidationError("The new passwords do not match.")
        return data

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is not correct.")
        return value

    def update(self, instance, validated_data):
        instance.set_password(validated_data['new_password'])
        instance.save()
        return instance