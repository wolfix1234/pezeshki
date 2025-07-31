// Simple test script to verify authentication endpoints
// Run with: node test-auth.js

const BASE_URL = 'http://localhost:3001';

async function testAuth() {
  console.log('🧪 Testing Authentication System...\n');

  try {
    // Test 1: Register a new user
    console.log('1️⃣ Testing user registration...');
    const registerResponse = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      }),
    });

    const registerData = await registerResponse.json();
    console.log('Register Response:', registerData);

    if (registerData.success) {
      console.log('✅ Registration successful!');
      const token = registerData.token;

      // Test 2: Get user profile
      console.log('\n2️⃣ Testing profile retrieval...');
      const profileResponse = await fetch(`${BASE_URL}/api/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const profileData = await profileResponse.json();
      console.log('Profile Response:', profileData);

      if (profileData.success) {
        console.log('✅ Profile retrieval successful!');
      } else {
        console.log('❌ Profile retrieval failed:', profileData.message);
      }

      // Test 3: Login with the same credentials
      console.log('\n3️⃣ Testing user login...');
      const loginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123'
        }),
      });

      const loginData = await loginResponse.json();
      console.log('Login Response:', loginData);

      if (loginData.success) {
        console.log('✅ Login successful!');
      } else {
        console.log('❌ Login failed:', loginData.message);
      }

    } else {
      console.log('❌ Registration failed:', registerData.message);
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }

  console.log('\n🏁 Authentication tests completed!');
}

// Run the test
testAuth();