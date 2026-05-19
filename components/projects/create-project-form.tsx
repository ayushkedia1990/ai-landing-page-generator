"use client";

import { useActionState } from "react";

import {
  createProject,
  type CreateProjectState,
} from "@/app/dashboard/actions";

const initialState: CreateProjectState = {};

export function CreateProjectForm() {
  const [state, formAction, pending] = useActionState(
    createProject,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className="text-sm font-semibold text-foreground">
          Project name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Acme launch page"
          className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
        />
        {state.errors?.name?.[0] ? (
          <p className="mt-2 text-sm text-danger">{state.errors.name[0]}</p>
        ) : null}
      </div>

      {state.message ? (
        <p className="text-sm text-muted-foreground">{state.message}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Creating project..." : "Create project"}
      </button>
    </form>
  );
}