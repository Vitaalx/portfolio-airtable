import { ref } from "vue";
import { type z, type ZodType } from "zod";

interface AirtableApiResponse {
	records: {
		id: string;
		fields: Record<string, unknown>;
		createdTime: string;
	}[];
}

type TableAirtable = "Project" | "Student" | "Technology" | "Like";

export function useGetFetchAirtable<
	GenericZodType extends ZodType = ZodType,
>(
	tableName: TableAirtable,
	zodSchema: GenericZodType,
) {
	const fetchedData = ref<z.infer<GenericZodType>>([]);
	const baseUrl = `https://api.airtable.com/v0/appWVbhDdDZ3a6269/${tableName}`;

	async function getData() {
		await fetch(
			baseUrl,
			{
				method: "GET",
				headers: {
					Authorization: "Bearer patJ8epPt3vOFC64I.500b60268567f964c9eb47826da3b45230ed9b50bcb8853f9dd138bb9e6b5da4",
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			},
		)
			.then(
				(response) => {
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					return response.json() as Promise<AirtableApiResponse>;
				},
			)
			.then(
				(json) => {
					const jsonMapped = json.records.map(
						(input) => ({
							id: input.id,
							createdTime: input.createdTime,
							fields: input.fields,
						}),
					);

					const { success, data, error } = zodSchema.safeParse(jsonMapped);

					if (!success) {
						throw new Error(error.errors.shift()!.message);
					}

					fetchedData.value = <never>data;
				},
			);
	}

	return {
		fetchedData,
		getData,
	};
}
