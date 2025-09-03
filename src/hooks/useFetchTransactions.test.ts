import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useFetchTransactions } from "./useFetchTransactions";

describe("useFetchTransactions", () => {
  it("handles successful fetch", async () => {
    const { result } = renderHook(() => useFetchTransactions());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.data.length).toBeGreaterThan(0);
    });
  });
});
