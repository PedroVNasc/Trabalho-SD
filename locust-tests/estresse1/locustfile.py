from locust import HttpUser, task, between

base = '/api'


class Spammer(HttpUser):
    wait_time = between(0.5, 2)

    @task
    def clinic_spam(self):
        for _ in range(10):
            self.client.get(f"{base}/clinic/{0}")

    @task
    def doctor_spam(self):
        for _ in range(10):
            self.client.get(f"{base}/doctor/{0}")

    @task
    def prescription_spam(self):
        for _ in range(10):
            self.client.get(f"{base}/prescription/{0}")

    @task
    def prescription_request_spam(self):
        for _ in range(10):
            self.client.get(f"{base}/prescription-request/{0}")
