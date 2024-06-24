from locust import HttpUser, task, between
from random import randint

base = '/api'

class Spammer(HttpUser):
    @task
    def clinic_spam(self):
        for _ in range(1000):
            self.client.get(f"{base}/clinic/{0}")
        
    wait_time = between(0.5, 1)
    
    @task
    def doctor_spam(self):
        for _ in range(1000):
            self.client.get(f"{base}/doctor/{0}")
        
    wait_time = between(0.5, 1)
    
    @task
    def prescription_spam(self):
        for _ in range(1000):
            self.client.get(f"{base}/prescription/{0}")
        
    wait_time = between(0.5, 1)
    
    @task
    def prescription_request_spam(self):
        for _ in range(1000):
            self.client.get(f"{base}/prescription-request/{0}")
        
    wait_time = between(0.5, 1)
    
    
        
    