interface CheckEmailResponse {
  success: boolean;
  exists: boolean;
  message: string;
}

const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const res = await fetch('http://localhost:3120/api/users/check-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data: CheckEmailResponse = await res.json();

    if (!data.success) {
      console.error('خطا در بررسی ایمیل:', data.message);
      return false;
    }
console.log(data)
    return data.exists;
  } catch (err) {
    console.error('خطای شبکه یا سرور:', err);
    return false;
  }
};

export default checkEmailExists;
