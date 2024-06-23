import requests
from faker import Faker
import random

fake = Faker()

BASE_URL = "http://localhost:3000/api"

def create_user():
    data = {
        "CNS": fake.unique.ssn(),
        "name": fake.name(),
        "birthdate": fake.date_of_birth().isoformat(),
        "email": fake.email(),
        "phone": fake.phone_number(),
        "password": fake.password(),
        "sex": random.choice(["M", "F"])
    }
    response = requests.post(f"{BASE_URL}/user", json=data)
    return response.json()

def create_doctor():
    data = {
        "id": random.randint(1, 1000),
        "name": fake.name(),
        "email": fake.email(),
        "phone": fake.phone_number(),
        "address": fake.address(),
        "city": fake.city(),
        "state": fake.state(),
        "zipCode": fake.zipcode(),
        "specialty": fake.job(),
        "licenseNumber": fake.unique.ssn()
    }
    response = requests.post(f"{BASE_URL}/doctor", json=data)
    return response.json()

def create_insurance():
    data = {
        "region": fake.state(),
        "name": fake.company()
    }
    response = requests.post(f"{BASE_URL}/insurance", json=data)
    return response.json()

def create_medicine():
    data = {
        "name": fake.word(),
        "genericName": fake.word(),
        "brandName": fake.word(),
        "dosageForm": random.choice(["tablet", "capsule", "syrup"]),
        "strength": f"{random.randint(1, 500)}mg",
        "manufacturer": fake.company(),
        "expiryDate": fake.date(),
        "batchNumber": fake.unique.ssn(),
        "indications": [fake.word() for _ in range(3)],
        "contraindications": [fake.word() for _ in range(3)],
        "sideEffects": [fake.word() for _ in range(3)],
        "storageConditions": fake.sentence(),
        "price": round(random.uniform(5, 100), 2),
        "prescriptionRequired": random.choice([True, False]),
        "quantity": random.randint(1, 1000)
    }
    response = requests.post(f"{BASE_URL}/medicine", json=data)
    return response.json()

def create_prescription(user_id, doctor_id, medicine_id):
    data = {
        "id": random.randint(1, 1000),
        "medicine": medicine_id,
        "patient": user_id,
        "doctor": doctor_id
    }
    response = requests.post(f"{BASE_URL}/prescription", json=data)
    return response.json()

def create_pharmacy():
    data = {
        "region": fake.state(),
        "name": fake.company(),
        "address": fake.address(),
        "medicines": [create_medicine()]
    }
    response = requests.post(f"{BASE_URL}/pharmacy", json=data)
    return response.json()

def create_pharmacist(pharmacy_id):
    data = {
        "id": random.randint(1, 1000),
        "region": fake.state(),
        "name": fake.name(),
        "address": fake.address(),
        "phone": fake.phone_number(),
        "email": fake.email(),
        "licenseNumber": fake.unique.ssn(),
        "pharmacyId": pharmacy_id
    }
    response = requests.post(f"{BASE_URL}/pharmacist", json=data)
    return response.json()

def create_prescription_request(prescription_id, pharmacist_id):
    data = {
        "prescription": prescription_id,
        "aproved": random.choice([True, False]),
        "readiness": fake.word(),
        "pharmacist": pharmacist_id,
        "requestDate": fake.date(),
        "deliveryDate": fake.date(),
        "status": random.choice(["Pending", "Approved", "Rejected"])
    }
    response = requests.post(f"{BASE_URL}/prescription-request", json=data)
    return response.json()

def main():
    print("Creating user...")
    user = create_user()
    print(user)

    print("Creating doctor...")
    doctor = create_doctor()
    print(doctor)

    print("Creating insurance...")
    insurance = create_insurance()
    print(insurance)

    print("Creating medicine...")
    medicine = create_medicine()
    print(medicine)

    print("Creating prescription...")
    prescription = create_prescription(user['_id'], doctor['_id'], medicine['_id'])
    print(prescription)

    print("Creating pharmacy...")
    pharmacy = create_pharmacy()
    print(pharmacy)

    print("Creating pharmacist...")
    pharmacist = create_pharmacist(pharmacy['_id'])
    print(pharmacist)

    print("Creating prescription request...")
    prescription_request = create_prescription_request(prescription['_id'], pharmacist['_id'])
    print(prescription_request)

if __name__ == "__main__":
    main()

