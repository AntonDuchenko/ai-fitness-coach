"use client";

import { Button } from "@/components/ui/button";

function GoogleBrandIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.805 12.23c0-.75-.067-1.47-.193-2.16H12v4.09h5.493a4.694 4.694 0 0 1-2.036 3.08v2.55h3.295c1.93-1.78 3.053-4.4 3.053-7.56Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.76 0 5.073-.915 6.764-2.48l-3.295-2.55c-.915.615-2.084.98-3.47.98-2.667 0-4.926-1.8-5.734-4.22H2.86v2.63A9.998 9.998 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.266 13.73A5.995 5.995 0 0 1 6 12c0-.6.1-1.185.266-1.73V7.64H2.86A9.996 9.996 0 0 0 2 12c0 1.61.384 3.13 1.06 4.36l3.206-2.63Z"
        fill="#FBBC05"
      />
      <path
        d="M12 6.05c1.5 0 2.848.515 3.91 1.53l2.93-2.93C17.066 2.98 14.753 2 12 2a9.998 9.998 0 0 0-9.14 5.64l3.406 2.63c.808-2.42 3.067-4.22 5.734-4.22Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function AppleBrandIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.736 12.39c.019 2.06 1.807 2.744 1.827 2.752-.015.048-.285.977-.94 1.935-.565.829-1.152 1.654-2.074 1.671-.907.017-1.199-.538-2.236-.538-1.036 0-1.361.521-2.219.554-.889.033-1.566-.891-2.136-1.717-1.164-1.688-2.054-4.772-.858-6.847.594-1.029 1.656-1.68 2.809-1.697.875-.017 1.701.588 2.236.588.535 0 1.538-.728 2.593-.621.442.018 1.682.179 2.477 1.343-.064.04-1.481.863-1.479 2.577ZM15.094 6.63c.474-.575.795-1.374.708-2.17-.682.027-1.507.456-1.996 1.031-.438.505-.822 1.315-.718 2.087.761.058 1.534-.387 2.006-.948Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        type="button"
        variant="outline"
        className="h-[52px] rounded-xl border-border/20 bg-accent text-sm font-semibold hover:bg-accent/80"
        aria-label="Continue with Google"
      >
        <GoogleBrandIcon />
        Google
      </Button>
      <Button
        type="button"
        variant="outline"
        className="h-[52px] rounded-xl border-border/20 bg-accent text-sm font-semibold hover:bg-accent/80"
        aria-label="Continue with Apple"
      >
        <AppleBrandIcon />
        Apple
      </Button>
    </div>
  );
}
