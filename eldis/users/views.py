# from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

"""
Users API views.

This module provides API endpoints for user account management and information retrieval.
It includes functionality for retrieving authenticated user details and other user-related operations.
"""


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_me(request):
    """
    Returns information about the currently authenticated user.

    This endpoint provides basic profile information for the authenticated user making the request.
    It requires a valid authentication token to be included in the request.

    Parameters:
        request (HttpRequest): The HTTP request object containing user authentication.
                             The authenticated user is accessed via request.user.

    Returns:
        Response: A JSON response containing user details including:
            - id: The user's unique identifier
            - username: The user's username
            - email: The user's email address
            - first_name: The user's first name
            - last_name: The user's last name
            - is_active: Boolean indicating if the user account is active

    Raises:
        PermissionDenied: If the request is not authenticated.
    """
    user = request.user
    data = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'is_active': user.is_active,
        # Add other fields you need
    }
    return Response(data)
