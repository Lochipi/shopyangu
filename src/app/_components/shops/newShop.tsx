"use client";

import React from "react";
import { TextInput, Textarea, Button, Card, Stack, Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { UploadButton } from "~/utils/uploadthing";
import { api } from "~/trpc/react";
import { toast } from "react-toastify";

interface FormValues {
  name: string;
  description: string;
  logo: string;
}

interface NewShopFormProps {
  refetchShops: () => void;
}

const NewShopForm = ({ refetchShops }: NewShopFormProps) => {
  const [logoURL, setLogoURL] = React.useState<string>("");

  const shopCreation = api.shops.createShop.useMutation({
    onSuccess: () => {
      toast.success("Shop created successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      refetchShops();
    },
    onError: (error) => {
      toast.error(error.message || "Shop creation failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });

  const form = useForm<FormValues>({
    initialValues: {
      name: "",
      description: "",
      logo: "",
    },
    validate: {
      name: (value) =>
        value.trim().length < 2 ? "Name must have at least 2 characters" : null,
      description: (value) =>
        value.trim().length < 5
          ? "Description must have at least 5 characters"
          : null,
    },
  });

  async function handleSubmit(values: FormValues) {
    shopCreation.mutate({
      name: values.name,
      description: values.description,
      logo: logoURL,
    });
  }

  return (
    <Card shadow="sm" padding="lg" style={{ maxWidth: 800, margin: "auto" }}>
      <form onSubmit={form.onSubmit((values) => void handleSubmit(values))}>
        <Stack gap="lg">
          <Grid>
            <Grid.Col span={12}>
              <TextInput
                {...form.getInputProps("name")}
                label="Shop Name"
                placeholder="Enter shop name"
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                {...form.getInputProps("description")}
                label="Description"
                placeholder="Enter shop description"
                autosize
                minRows={3}
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setLogoURL(res[0]?.url ?? "");
                  toast.success("Logo uploaded successfully", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
                }}
                onUploadError={(error: Error) => {
                  toast.error(error.message || "Logo upload failed", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
                }}
              />
            </Grid.Col>
          </Grid>
          <Button
            type="submit"
            fullWidth
            disabled={!form.isValid()}
            className="bg-[#1D4ED8] text-white"
          >
            Create Shop
          </Button>
        </Stack>
      </form>
    </Card>
  );
};

export default NewShopForm;
