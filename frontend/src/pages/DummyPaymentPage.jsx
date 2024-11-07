
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Smartphone, 
  Shield, 
  CheckCircle,
  Lock,
  AlertCircle,
  ArrowRight,
  Mail
} from 'lucide-react';

const PaymentGateway = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
  });
  const [otpCode, setOtpCode] = useState('');
  const [step, setStep] = useState(1); // 1: Card Details, 2: OTP, 3: Processing
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('card');

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
    }
    return v;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiry') {
      formattedValue = formatExpiry(value);
    } else if (name === 'cvv') {
      formattedValue = value.slice(0, 3);
    }

    setPaymentDetails(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmitCard = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate OTP sending
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
    }, 1500);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      if (otpCode === '123456') {
        setStep(3);
        // Simulate final processing
        setTimeout(() => {
          setIsProcessing(false);
          navigate(`/course/${courseId}`);
        }, 2000);
      } else {
        setIsProcessing(false);
        setError('Invalid OTP code. Please try again.');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-lg mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className=" p-4 rounded-xl shadow-sm inline-block">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              SciAstra
            </h1>
          </div>
        </div>

        {/* Header with secure badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600">Secure Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">End-to-end encrypted</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 1 ? 'bg-blue-600 text-white' : 
              step > 1 ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}>
              <CreditCard className="w-4 h-4" />
            </div>
            <div className={`w-20 h-1 ${step > 1 ? 'bg-green-500' : 'bg-gray-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 2 ? 'bg-blue-600 text-white' : 
              step > 2 ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}>
              <Shield className="w-4 h-4" />
            </div>
            <div className={`w-20 h-1 ${step > 2 ? 'bg-green-500' : 'bg-gray-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Main payment card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {step === 1 && (
            <>
              {/* Payment method tabs */}
              <div className="flex border-b">
                <button
                  className={`flex-1 py-4 px-6 text-sm font-medium ${
                    activeTab === 'card' 
                      ? 'bg-white border-b-2 border-blue-600 text-blue-600'
                      : 'bg-gray-50 text-gray-600'
                  }`}
                  onClick={() => setActiveTab('card')}
                >
                  <div className="flex items-center justify-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Card Payment</span>
                  </div>
                </button>
                <button
                  className={`flex-1 py-4 px-6 text-sm font-medium ${
                    activeTab === 'upi'
                      ? 'bg-white border-b-2 border-blue-600 text-blue-600'
                      : 'bg-gray-50 text-gray-600'
                  }`}
                  onClick={() => setActiveTab('upi')}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    <span>UPI Payment</span>
                  </div>
                </button>
              </div>

              {/* Card payment form */}
              {activeTab === 'card' && (
                <form onSubmit={handleSubmitCard} className="p-6 space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-700">
                      <AlertCircle className="w-5 h-5" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}

                  {/* Order summary */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Course ID</span>
                      <span className="font-medium">{courseId}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Amount</span>
                      <span className="font-medium">₹499.00</span>
                    </div>
                  </div>

                  {/* Card number */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Card number</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentDetails.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength="19"
                        required
                      />
                      <CreditCard className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Card holder */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Card holder name</label>
                    <input
                      type="text"
                      name="cardHolder"
                      value={paymentDetails.cardHolder}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Expiry and CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Expiry date</label>
                      <input
                        type="text"
                        name="expiry"
                        value={paymentDetails.expiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength="5"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">CVV</label>
                      <input
                        type="password"
                        name="cvv"
                        value={paymentDetails.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength="3"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 
                      transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* UPI section remains the same */}
            </>
          )}

          {step === 2 && (
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Two-Factor Authentication</h2>
                <p className="text-gray-600 text-sm">
                  Enter the 6-digit code sent to your registered email
                  <br />
                  <span className="text-gray-500">For demo, use: 123456</span>
                </p>
              </div>

              {error && (
                <div className="p-3 mb-4 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="flex justify-center gap-2">
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    maxLength="6"
                    placeholder="Enter OTP"
                    className="w-48 px-3 py-2 text-center text-lg tracking-widest border border-gray-300 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isProcessing || otpCode.length !== 6}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 
                    transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    'Verify & Pay'
                  )}
                </button>

                <div className="text-center">
                  <button 
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-700"
                    onClick={() => setStep(1)}
                  >
                    Back to payment details
                  </button>
                </div>
              </form>
            </div>
          )}

{step === 3 && (
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Payment Successful</h2>
              <p className="text-gray-600 text-sm mb-6">
                Your payment for <strong>Course ID: {courseId}</strong> has been successfully processed.
              </p>
              <button
                onClick={() => navigate(`/course/${courseId}`)}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 
                  transition-colors flex items-center justify-center gap-2"
              >
                <span>Go to Course</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
