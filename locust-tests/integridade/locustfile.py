from locust import HttpUser, task, between
from faker import Faker
import random

fake = Faker()

BASE = '/api'


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

    return data


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

    return data


def create_insurance():
    data = {
        "region": fake.state(),
        "name": fake.company()
    }

    return data


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

    return data


def create_prescription(user_id, doctor_id, medicine_id):
    data = {
        "id": random.randint(1, 1000),
        "medicine": medicine_id,
        "patient": user_id,
        "doctor": doctor_id
    }

    return data


def create_pharmacy():
    data = {
        "region": fake.state(),
        "name": fake.company(),
        "address": fake.address(),
        "medicines": [create_medicine()]
    }

    return data


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

    return data


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

    return data


class Spammer(HttpUser):
    wait_time = between(0.5, 1)

    @task
    def write_spam(self):
        for _ in range(100):
            user_data = create_user()
            user = self.client.post(f"{BASE}/user", json=user_data)
            
            doctor_data = create_doctor()
            doctor = self.client.post(f"{BASE}/doctor", json=doctor_data)
            
            insurance_data = create_insurance()
            insurance = self.client.post(f"{BASE}/insurance", json=insurance_data)
            
            medicine_data = create_medicine()
            medicine = self.client.post(f"{BASE}/medicine", json=medicine_data)
            
            prescription_data = create_prescription(user['_id'], doctor['_id'], medicine['_id'])
            prescription = self.client.post(f"{BASE}/prescription", json=prescription_data)
            
            pharmacy_data = create_pharmacy()
            pharmacy = self.client.post(f"{BASE}/pharmacy", json=pharmacy_data)
            
            pharmacist_data = create_pharmacist(pharmacy['_id'])
            pharmacist = self.client.post(f"{BASE}/pharmacist", json=pharmacist_data)
            
            prescription_request_data = create_prescription_request(prescription['_id'], pharmacist['_id'])
            prescription_request = self.client.post(f"{BASE}/prescription-request", json=prescription_request_data)
            
            
