import React, { useState, useEffect } from 'react';

const Register = () => {
  // State for form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [dob, setDob] = useState('');           // UI only
  const [nationalId, setNationalId] = useState(''); // UI only
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [state, setState] = useState('');       // new state field

  // UI states
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // List of states (must match backend enum exactly)
  // Replace these with your actual enum values
  const stateOptions = [
    'ANDHRA_PRADESH',
    'ARUNACHAL_PRADESH',
    'ASSAM',
    'BIHAR',
    'CHHATTISGARH',
    'GOA',
    'GUJARAT',
    'HARYANA',
    'HIMACHAL_PRADESH',
    'JHARKHAND',
    'KARNATAKA',
    'KERALA',
    'MADHYA_PRADESH',
    'MAHARASHTRA',
    'MANIPUR',
    'MEGHALAYA',
    'MIZORAM',
    'NAGALAND',
    'ODISHA',
    'PUNJAB',
    'RAJASTHAN',
    'SIKKIM',
    'TAMIL_NADU',
    'TELANGANA',
    'TRIPURA',
    'UTTAR_PRADESH',
    'UTTARAKHAND',
    'WEST_BENGAL',
    'ANDAMAN_AND_NICOBAR_ISLANDS',
    'CHANDIGARH',
    'DADRA_AND_NAGAR_HAVELI_AND_DAMAN_AND_DIU',
    'DELHI',
    'JAMMU_AND_KASHMIR',
    'LADAKH',
    'LAKSHADWEEP',
    'PUDUCHERRY'
  ];

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOtp = async () => {
    if (!email) {
      setError('Please enter an email address first');
      return;
    }
    setIsSendingOtp(true);
    setError('');
    setMessage('');
    try {
      const response = await fetch('http://localhost:8080/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'REGISTRATION' })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setOtpSent(true);
        setTimer(60);
        setMessage('OTP sent successfully to your email');
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Network error - could not send OTP');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }
    setIsVerifyingOtp(true);
    setError('');
    setMessage('');
    try {
      const response = await fetch('http://localhost:8080/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, type: 'REGISTRATION' })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setOtpVerified(true);
        setMessage('Email verified successfully');
      } else {
        setError(data.message || 'Invalid or expired OTP');
      }
    } catch (err) {
      setError('Network error - could not verify OTP');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validations
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!state) {
      setError('Please select a state');
      return;
    }

    // Split full name into first and last
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Build request body exactly matching RegisterRequest
    const requestBody = {
      firstName: firstName,
      lastName: lastName,
      mobileNumber: mobileNumber,   // map phone to mobileNumber
      email: email,
      state: state,                 // selected state
      password: password,
      otpCode: otp
    };

    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Use full URL if not using proxy
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      // Handle non-JSON responses or empty responses (like 403)
      const contentType = response.headers.get("content-type");
      let data = {};

      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.warn("Received non-JSON response:", text);
      }

      if (response.ok && data.success) {
        setMessage('Registration successful! Please login.');
      } else {
        setError(data.message || `Registration failed (Status: ${response.status}). Please check backend logs.`);
      }
    } catch (err) {
      setError('Network error – could not reach server. Make sure backend is running.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center py-12 px-6 transition-colors duration-500">
      <div className="max-w-2xl w-full bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 text-left">Create Citizen Account</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm text-left">Fill in your official details to access government services.</p>

        {message && <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">{message}</div>}
        {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Full Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name (As per ID) <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Sadiya Shaikh"
              required
            />
          </div>

          {/* Email and OTP Section */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address <span className="text-red-500">*</span></label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="name@example.com"
                  required
                  disabled={otpVerified}
                />
                {!otpSent && !otpVerified && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isSendingOtp}
                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-semibold hover:bg-blue-100 transition disabled:opacity-50 whitespace-nowrap"
                  >
                    {isSendingOtp ? 'Sending...' : 'Send OTP'}
                  </button>
                )}
              </div>
              {otpVerified && (
                <span className="text-xs text-green-600 font-medium absolute -bottom-5 left-0">✓ Email verified</span>
              )}
            </div>

            {otpSent && !otpVerified && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Enter OTP</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="6-digit code"
                    maxLength="6"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={isVerifyingOtp || otp.length !== 6}
                    className="px-4 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50"
                  >
                    {isVerifyingOtp ? 'Verifying...' : 'Verify'}
                  </button>
                </div>
                <div className="mt-2 flex justify-between items-center px-1">
                  <p className="text-xs text-slate-500">
                    {timer > 0 ? `Resend available in ${timer}s` : "Didn't receive code?"}
                  </p>
                  {!otpVerified && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isSendingOtp || timer > 0}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:text-slate-400"
                    >
                      {isSendingOtp ? 'Sending...' : 'Resend OTP'}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Number (phone) */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Mobile Number <span className="text-red-500">*</span></label>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="10-digit number"
              required
              pattern="[0-9]{10}"
              title="Please enter a 10-digit mobile number"
            />
          </div>

          {/* Date of Birth (UI only) */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* National ID / Aadhar (UI only) */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">National ID / Aadhar</label>
            <input
              type="text"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="12-digit number"
            />
          </div>

          {/* State (required) */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">State <span className="text-red-500">*</span></label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              required
            >
              <option value="">Select your state</option>
              {stateOptions.map((s) => (
                <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Password <span className="text-red-500">*</span></label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
              minLength="6"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Confirm Password <span className="text-red-500">*</span></label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !otpVerified}
            className="md:col-span-2 w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Registering...' : !otpVerified ? 'Verify Email to Register' : 'Register for SmartGov'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;