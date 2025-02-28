import secrets
import string
import random
import base64
import hashlib


def generate_secret_key():
    """Generates a random secret key."""
    alphabet = string.ascii_letters + string.digits + string.punctuation
    return ''.join(secrets.choice(alphabet) for i in range(50))  # 50 chars long

print(generate_secret_key())

code_verifier = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(random.randint(43, 128)))

print(code_verifier)

code_challenge = hashlib.sha256(code_verifier.encode('utf-8')).digest()
code_challenge = base64.urlsafe_b64encode(code_challenge).decode('utf-8').replace('=', '')

print(code_challenge)
