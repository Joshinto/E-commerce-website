"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("Nigeria");

  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status !== "authenticated") {
      if (status === "unauthenticated") {
        setIsLoadingProfile(false);
      }
      return;
    }

    async function loadProfile() {
      try {
        setIsLoadingProfile(true);
        setError("");

        const response = await fetch("/api/account/profile", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Unable to load your profile.");
          return;
        }

        const user = data.user;

        setFirstName(user.firstName || "");
        setLastName(user.lastName || "");
        setPhone(user.phone || "");
        setAddress(user.address || "");
        setCity(user.city || "");
        setState(user.state || "");
        setCountry(user.country || "Nigeria");
      } catch (profileError) {
        console.error("Load profile error:", profileError);
        setError("Unable to load your profile. Please try again.");
      } finally {
        setIsLoadingProfile(false);
      }
    }

    loadProfile();
  }, [status]);

  if (status === "loading" || isLoadingProfile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading profile...</p>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Please log in
          </h1>

          <Link
            href="/login"
            className="mt-4 inline-block rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white"
          >
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!firstName.trim() || !lastName.trim()) {
      setError("First name and last name are required.");
      return;
    }

    try {
      setIsSaving(true);

      const response = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to update profile.");
        return;
      }

      await update({
        name: `${firstName.trim()} ${lastName.trim()}`,
      });

      setMessage("Profile updated successfully.");
    } catch (error) {
      console.error("Profile update error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <Link
          href="/account"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          <ArrowLeft size={17} />
          Back to Account
        </Link>

        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">Profile</p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Your Profile
          </h1>

          <p className="mt-2 text-gray-600">
            Update your personal information.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8 flex items-center gap-4 border-b pb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 text-xl font-bold text-white">
              {firstName.charAt(0).toUpperCase() || "U"}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {session.user.name || "User"}
              </h2>

              <p className="text-sm text-gray-500">
                {session.user.email}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>

                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="First name"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>

                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>

              <div className="flex items-center gap-3 rounded-lg border bg-gray-50 px-4 py-3">
                <User size={18} className="text-gray-400" />

                <input
                  id="email"
                  type="email"
                  value={session.user.email || ""}
                  disabled
                  className="w-full bg-transparent text-gray-500 outline-none"
                />
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Email address cannot be changed here.
              </p>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {message && (
              <div className="rounded-lg bg-green-50 p-4 text-sm text-green-700">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSaving}
              className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}