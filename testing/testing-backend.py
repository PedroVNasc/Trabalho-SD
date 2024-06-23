import requests
import random
import string
from datetime import datetime

BASE_URL = "http://localhost:3000/api"

def random_string(length=8):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def get_user_input(prompt, default_value):
    user_input = input(f"{prompt} (press Enter to use '{default_value}'): ")
    return user_input or default_value

def create_user():
    print("\nCreating a new user...")
    name = get_user_input("Enter name", random_string())
    email = get_user_input("Enter email", f"{random_string()}@example.com")
    password = get_user_input("Enter password", random_string())
    response = requests.post(f"{BASE_URL}/register", json={"name": name, "email": email, "password": password})
    print("Response:", response.json())

def get_users():
    print("\nRetrieving all users...")
    response = requests.get(f"{BASE_URL}/users")
    print("Response:", response.json())

def create_doctor():
    print("\nCreating a new doctor...")
    doctor_id = get_user_input("Enter doctor ID", str(random.randint(1, 10000)))
    response = requests.post(f"{BASE_URL}/doctor", json={"id": doctor_id})
    print("Response:", response.json())

def get_doctors():
    print("\nRetrieving all doctors...")
    response = requests.get(f"{BASE_URL}/doctors")
    print("Response:", response.json())

def create_insurance():
    print("\nCreating a new insurance...")
    region = get_user_input("Enter region", random_string())
    response = requests.post(f"{BASE_URL}/insurance", json={"region": region})
    print("Response:", response.json())

def get_insurances():
    print("\nRetrieving all insurances...")
    response = requests.get(f"{BASE_URL}/insurances")
    print("Response:", response.json())

def create_medicine():
    print("\nCreating a new medicine...")
    medicine_id = get_user_input("Enter medicine ID", str(random.randint(1, 10000)))
    label = get_user_input("Enter label", random_string())
    response = requests.post(f"{BASE_URL}/medicine", json={"id": medicine_id, "label": label})
    print("Response:", response.json())

def get_medicines():
    print("\nRetrieving all medicines...")
    response = requests.get(f"{BASE_URL}/medicines")
    print("Response:", response.json())

def create_prescription():
    print("\nCreating a new prescription...")
    prescription_id = get_user_input("Enter prescription ID", str(random.randint(1, 10000)))
    medicine = get_user_input("Enter medicine", random_string())
    patient = get_user_input("Enter patient ID", str(random.randint(1, 10000)))
    doctor = get_user_input("Enter doctor ID", str(random.randint(1, 10000)))
    response = requests.post(f"{BASE_URL}/prescription", json={"id": prescription_id, "medicine": medicine, "patient": patient, "doctor": doctor})
    print("Response:", response.json())

def get_prescriptions():
    print("\nRetrieving all prescriptions...")
    response = requests.get(f"{BASE_URL}/prescriptions")
    print("Response:", response.json())

def create_stock():
    print("\nCreating a new stock...")
    region = get_user_input("Enter region", random_string())
    medicine = get_user_input("Enter medicine", random_string())
    quantity = get_user_input("Enter quantity", str(random.randint(1, 1000)))
    response = requests.post(f"{BASE_URL}/stock", json={"region": region, "medicine": medicine, "quantity": quantity})
    print("Response:", response.json())

def get_stocks():
    print("\nRetrieving all stocks...")
    response = requests.get(f"{BASE_URL}/stocks")
    print("Response:", response.json())

def create_prescription_request():
    print("\nCreating a new prescription request...")
    prescription = get_user_input("Enter prescription ID", str(random.randint(1, 10000)))
    readiness = get_user_input("Enter readiness", random_string())
    pharmacist = get_user_input("Enter pharmacist", random_string())
    request_date = get_user_input("Enter request date", datetime.now().isoformat())
    delivery_date = get_user_input("Enter delivery date", datetime.now().isoformat())
    status = get_user_input("Enter status", random_string())
    response = requests.post(f"{BASE_URL}/prescription-request", json={
        "prescription": prescription,
        "readiness": readiness,
        "pharmacist": pharmacist,
        "requestDate": request_date,
        "deliveryDate": delivery_date,
        "status": status
    })
    print("Response:", response.json())

def get_prescription_requests():
    print("\nRetrieving all prescription requests...")
    response = requests.get(f"{BASE_URL}/prescription-requests")
    print("Response:", response.json())

def main():
    while True:
        print("\nSelect an action:")
        print("1. Create User")
        print("2. Get Users")
        print("3. Create Doctor")
        print("4. Get Doctors")
        print("5. Create Insurance")
        print("6. Get Insurances")
        print("7. Create Medicine")
        print("8. Get Medicines")
        print("9. Create Prescription")
        print("10. Get Prescriptions")
        print("11. Create Stock")
        print("12. Get Stocks")
        print("13. Create Prescription Request")
        print("14. Get Prescription Requests")
        print("0. Exit")

        choice = input("Enter choice: ")

        if choice == "1":
            create_user()
        elif choice == "2":
            get_users()
        elif choice == "3":
            create_doctor()
        elif choice == "4":
            get_doctors()
        elif choice == "5":
            create_insurance()
        elif choice == "6":
            get_insurances()
        elif choice == "7":
            create_medicine()
        elif choice == "8":
            get_medicines()
        elif choice == "9":
            create_prescription()
        elif choice == "10":
            get_prescriptions()
        elif choice == "11":
            create_stock()
        elif choice == "12":
            get_stocks()
        elif choice == "13":
            create_prescription_request()
        elif choice == "14":
            get_prescription_requests()
        elif choice == "0":
            break
        else:
            print("Invalid choice, please try again.")

if __name__ == "__main__":
    main()
