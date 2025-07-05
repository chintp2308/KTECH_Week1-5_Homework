import React, { useState } from "react";
import styles from "./RegistrationForm.module.css";

interface FormState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  gender: string;
  dob: string;
  country: string;
  hobbies: string[];
  profilePic: File | null;
  bio: string;
}

interface FormErrors {
  [key: string]: string;
}

const countries = ["Việt Nam", "USA", "Japan", "Other"];
const hobbiesList = ["Reading", "Traveling", "Gaming"];

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string) {
  return /^\d{10,}$/.test(phone);
}

function validatePassword(password: string) {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
}

function getAge(dateString: string) {
  const today = new Date();
  const dob = new Date(dateString);
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

const RegistrationForm: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
    dob: "",
    country: "",
    hobbies: [],
    profilePic: null,
    bio: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setForm({ ...form, profilePic: file });
    } else if (type === "checkbox" && name === "hobbies") {
      const checked = (e.target as HTMLInputElement).checked;
      const val = value;
      setForm((prev) => ({
        ...prev,
        hobbies: checked
          ? [...prev.hobbies, val]
          : prev.hobbies.filter((h) => h !== val),
      }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validate = (): FormErrors => {
    const err: FormErrors = {};
    if (!form.fullName || form.fullName.trim().length < 3)
      err.fullName = "Full Name must be at least 3 characters.";
    if (!form.email || !validateEmail(form.email))
      err.email = "Email must be a valid email format.";
    if (!form.password || !validatePassword(form.password))
      err.password =
        "Password must be at least 8 characters and contain letters and numbers.";
    if (form.confirmPassword !== form.password)
      err.confirmPassword = "Confirm Password must match the password.";
    if (!form.phone || !validatePhone(form.phone))
      err.phone = "Phone Number must be at least 10 digits.";
    if (!form.gender) err.gender = "Please select a gender.";
    if (!form.dob || getAge(form.dob) < 18)
      err.dob = "User must be at least 18 years old.";
    if (!form.country) err.country = "Please select a country.";
    if (!form.hobbies.length) err.hobbies = "Please select at least one hobby.";
    if (!form.profilePic) err.profilePic = "Please upload a profile picture.";
    else if (
      form.profilePic &&
      !["image/jpeg", "image/png", "image/jpg"].includes(form.profilePic.type)
    )
      err.profilePic = "Only .jpg, .jpeg, .png files are allowed.";
    if (form.bio.length > 300) err.bio = "Bio must be at most 300 characters.";
    return err;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setSubmitted(true);
    if (Object.keys(errs).length === 0) {
      alert("Register Success! (You can replace this with your logic)");
      setForm({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        gender: "",
        dob: "",
        country: "",
        hobbies: [],
        profilePic: null,
        bio: "",
      });
      setSubmitted(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.title}>User Registration</h2>

      <label>Full Name</label>
      <input
        type="text"
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
      />
      {errors.fullName && <div className={styles.error}>{errors.fullName}</div>}

      <label>Email</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      {errors.email && <div className={styles.error}>{errors.email}</div>}

      <label>Password</label>
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />
      {errors.password && <div className={styles.error}>{errors.password}</div>}

      <label>Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
      />
      {errors.confirmPassword && (
        <div className={styles.error}>{errors.confirmPassword}</div>
      )}

      <label>Phone Number</label>
      <input
        type="tel"
        name="phone"
        value={form.phone}
        onChange={handleChange}
      />
      {errors.phone && <div className={styles.error}>{errors.phone}</div>}

      <label>Gender</label>
      <div className={styles.inlineGroup}>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={form.gender === "Male"}
            onChange={handleChange}
          />{" "}
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={form.gender === "Female"}
            onChange={handleChange}
          />{" "}
          Female
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Other"
            checked={form.gender === "Other"}
            onChange={handleChange}
          />{" "}
          Other
        </label>
      </div>
      {errors.gender && <div className={styles.error}>{errors.gender}</div>}

      <label>Date of Birth</label>
      <input type="date" name="dob" value={form.dob} onChange={handleChange} />
      {errors.dob && <div className={styles.error}>{errors.dob}</div>}

      <label>Country</label>
      <select name="country" value={form.country} onChange={handleChange}>
        <option value="">Select Country</option>
        {countries.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      {errors.country && <div className={styles.error}>{errors.country}</div>}

      <label>Hobbies</label>
      <div className={styles.inlineGroup}>
        {hobbiesList.map((hobby) => (
          <label key={hobby}>
            <input
              type="checkbox"
              name="hobbies"
              value={hobby}
              checked={form.hobbies.includes(hobby)}
              onChange={handleChange}
            />{" "}
            {hobby}
          </label>
        ))}
      </div>
      {errors.hobbies && <div className={styles.error}>{errors.hobbies}</div>}

      <label>Profile Picture</label>
      <input
        type="file"
        name="profilePic"
        accept=".jpg,.jpeg,.png"
        onChange={handleChange}
      />
      {errors.profilePic && (
        <div className={styles.error}>{errors.profilePic}</div>
      )}

      <label>
        Bio <span className={styles.charCount}>({form.bio.length}/300)</span>
      </label>
      <textarea
        name="bio"
        value={form.bio}
        onChange={handleChange}
        maxLength={300}
        rows={3}
      />
      {errors.bio && <div className={styles.error}>{errors.bio}</div>}

      <button className={styles.submitBtn} type="submit">
        Register
      </button>
      {submitted && Object.keys(errors).length === 0 && (
        <div className={styles.success}>Registration successful!</div>
      )}
    </form>
  );
};

export default RegistrationForm;
