import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowRightAlt } from '../atoms/Icons';
import styles from '../../style/Common.module.css';
import CaptchaField from '../atoms/CaptchaField';

// const API_TOKEN = "68|ncbSSlsNVuTuoPIyYMSFKXZ6UWXMrkgXXWTALQnH008f96ac";
  const API_TOKEN="98|iSNX0GasFAy6KkOmsZ9Xk3oo7z2gHGW2ASgEvsrd79f08c60"

const TEMPLATE_ID = "1707175318595098816";
const ENTITY_ID = "1701159921797802436";

const loadBootstrap = () => {
  if (window.bootstrap?.Modal) {
    return Promise.resolve();
  }

  const existingScript = document.getElementById('bootstrap-bundle-js');
  if (existingScript) {
    return new Promise((resolve) => {
      existingScript.addEventListener('load', resolve, { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = 'bootstrap-bundle-js';
    script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
    script.integrity = 'sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz';
    script.crossOrigin = 'anonymous';
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

const EnquiryModal = ({ onHidden }) => {
  const formRef = useRef();
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaResetKey, setCaptchaResetKey] = useState(0);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const modalElement = modalRef.current;
    let cleanup;
    let cancelled = false;

    if (!modalElement) return undefined;

    loadBootstrap()
      .then(() => {
        if (cancelled || !window.bootstrap?.Modal) return;

        const modalInstance = window.bootstrap.Modal.getOrCreateInstance(modalElement);
        const handleHidden = () => onHidden?.();

        modalElement.addEventListener('hidden.bs.modal', handleHidden);
        modalInstance.show();
        cleanup = () => modalElement.removeEventListener('hidden.bs.modal', handleHidden);
      })
      .catch((error) => console.error('Error loading Bootstrap:', error));

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [onHidden]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((time) => time - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const validate = () => {
    const validationErrors = {};
    if (!formData.name.trim()) validationErrors.name = 'Name is required';
    if (!formData.email.trim()) validationErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) validationErrors.email = 'Invalid email';
    if (!formData.phone.trim()) validationErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone)) validationErrors.phone = 'Phone must be 10 digits';
    if (!formData.message.trim()) validationErrors.message = 'Message is required';

    return validationErrors;
  };

  const handleChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });
  const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

  const handleSendOtp = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fill all required fields correctly before sending OTP");
      return;
    }

    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA before sending OTP");
      return;
    }

    const newOtp = generateOtp();
    setOtp(newOtp);
    setIsSendingOtp(true);

    try {
      const message = `Dear User Your OTP code for Shivalik Ventures is ${newOtp} DO NOT disclose it to anyone.`;
      const apiUrl = `https://dtasit.ai/backend/api/http/sms/send?recipient=91${formData.phone}&sender_id=SHIVAK&message=${encodeURIComponent(message)}&api_token=${API_TOKEN}&dlt_template_id=${TEMPLATE_ID}&type=plain&entity_id=${ENTITY_ID}`;
      const response = await axios.get(apiUrl);

      if (response.data.status === 'success') {
        toast.success('OTP sent successfully!');
        setOtpSent(true);
        setTimer(30);
      } else {
        toast.error(response.data.message || 'Failed to send OTP');
      }
    } catch (err) {
      console.error('OTP Send Error:', err);
      toast.error('Failed to send OTP. Check API token or DLT settings.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = () => {
    if (enteredOtp.trim() === otp.trim()) {
      setOtpVerified(true);
      toast.success('OTP verified successfully!');
    } else {
      toast.error('Invalid OTP entered.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (!otpVerified) {
      toast.error('Please verify OTP before submitting');
      return;
    }

    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`${API_URL}/api/contact-response`, {
        ...formData,
        page: window.location.pathname,
        captcha_token: captchaToken,
      });

      toast.success('Your enquiry has been sent sucessfully');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setOtp('');
      setEnteredOtp('');
      setOtpSent(false);
      setOtpVerified(false);
      setTimer(0);
      setErrors({});
      setCaptchaResetKey((current) => current + 1);
      formRef.current?.reset();

      if (modalRef.current && window.bootstrap?.Modal) {
        window.bootstrap.Modal.getInstance(modalRef.current)?.hide();
      }
    } catch (err) {
      console.error('Failed to send email:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="modal fade enquirecustom" ref={modalRef} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title fs-5" id="exampleModalLabel">Enquire Now</h3>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form ref={formRef} onSubmit={handleSubmit} className="enquire_now_form" noValidate>
                <div className="mb-3 pb-1">
                  <input type="text" name="name" className="form-control" placeholder="Name" value={formData.name} onChange={handleChange} required />
                  {errors.name && <small className="text-danger">{errors.name}</small>}
                </div>

                <div className="mb-3 pb-1">
                  <input type="email" name="email" className="form-control" placeholder="Email" value={formData.email} onChange={handleChange} required />
                  {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>

                <div className="mb-3 pb-1">
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(event) => {
                      const input = event.target.value;
                      if (/^\d{0,10}$/.test(input)) {
                        setFormData({ ...formData, phone: input });
                      }
                    }}
                    onPaste={(event) => {
                      const paste = event.clipboardData.getData('text');
                      if (!/^\d{1,10}$/.test(paste)) event.preventDefault();
                    }}
                    required
                    inputMode="numeric"
                    maxLength="10"
                  />
                  {errors.phone && <small className="text-danger">{errors.phone}</small>}
                </div>

                <div className="mb-3 pb-1">
                  <textarea name="message" className="form-control" rows="3" placeholder="Message" value={formData.message} onChange={handleChange} required></textarea>
                  {errors.message && <small className="text-danger">{errors.message}</small>}
                </div>

                <CaptchaField onTokenChange={setCaptchaToken} resetKey={captchaResetKey} />

                {!otpSent && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isSendingOtp}
                    style={{ cursor: isSendingOtp ? "not-allowed" : "pointer", opacity: isSendingOtp ? 0.7 : 1 }}
                    className={`${styles.commonBlueButton} ${styles.enquireNowBtn} border-0 mt-3`}
                  >
                    {isSendingOtp ? "Sending..." : "Send OTP"} <ArrowRightAlt />
                  </button>
                )}

                {otpSent && !otpVerified && (
                  <div>
                    <input type="text" name="otp" placeholder="Enter OTP" value={enteredOtp} onChange={(event) => setEnteredOtp(event.target.value)} className="form-control" />
                    <div>
                      <p
                        className="text-primary mt-4"
                        style={{ cursor: timer <= 0 ? 'pointer' : 'default', fontSize: "15px" }}
                        onClick={() => timer <= 0 && handleSendOtp()}
                      >
                        {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
                      </p>
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={isSubmitting}
                        style={{ cursor: isSubmitting ? "not-allowed" : "pointer", opacity: isSubmitting ? 0.7 : 1 }}
                        className={`${styles.commonBlueButton} ${styles.enquireNowBtn} border-0 mt-3`}
                      >
                        Verify OTP <ArrowRightAlt />
                      </button>
                    </div>
                  </div>
                )}

                {otpVerified && (
                  <div className="mb-5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{ cursor: isSubmitting ? "not-allowed" : "pointer", opacity: isSubmitting ? 0.7 : 1 }}
                      className={styles.commonBlueButton}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"} <ArrowRightAlt />
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} />
    </>
  );
};

export default EnquiryModal;
