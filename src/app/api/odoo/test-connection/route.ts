import { authenticateWithOdoo, getOdooServerVersion } from "@/lib/odooClient";

type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  message: string;
  errors: string[];
};

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const uid = await authenticateWithOdoo();
    const version = await getOdooServerVersion();

    const body: ApiResponse<{ userId: number; serverVersion: string }> = {
      success: true,
      data: {
        userId: uid,
        serverVersion: version
      },
      message: "Connected to Odoo successfully",
      errors: []
    };

    return new Response(JSON.stringify(body), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Odoo connection error";

    const body: ApiResponse<null> = {
      success: false,
      data: null,
      message: "Failed to connect to Odoo",
      errors: [errorMessage]
    };

    return new Response(JSON.stringify(body), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
