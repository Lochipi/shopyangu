'use client";';

import {
  Button,
  Card,
  Grid,
  NumberInput,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { UploadButton } from "~/utils/uploadthing";
import { useState } from "react";
import { api } from "~/trpc/react";

interface FormValues {
  name: string;
  price: number;
  stockLevel: number;
  description: string;
  image: string;
}

interface NewProductFormProps {
  shopId: string;
}

const NewProductForm: React.FC<NewProductFormProps> = ({ shopId }) => {
  const [imageURL, setImageURL] = useState<string>("");

  const productCreation = api.products.createProduct.useMutation({
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Product created successfully",
        color: "green",
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message: error.message || "Product creation failed",
        color: "red",
      });
    },
  });

  const form = useForm<FormValues>({
    initialValues: {
      name: "",
      price: 0,
      stockLevel: 1,
      description: "",
      image: "",
    },
    validate: {
      name: (value) =>
        value.trim().length < 2 ? "Name must have at least 2 characters" : null,
      price: (value) => (value <= 0 ? "Price must be greater than 0" : null),
      stockLevel: (value) =>
        value < 1 ? "Stock level must be at least 1" : null,
      description: (value) =>
        value.trim().length < 5
          ? "Description must have at least 5 characters"
          : null,
    },
  });

  async function handleSubmit(values: FormValues) {
    productCreation.mutate({
      name: values.name,
      price: values.price,
      stockLevel: values.stockLevel,
      description: values.description,
      image: imageURL,
      shopId,
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
                label="Product Name"
                placeholder="Enter product name"
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                {...form.getInputProps("price")}
                label="Price"
                placeholder="Enter price"
                min={0.01}
                thousandSeparator=","
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                {...form.getInputProps("stockLevel")}
                label="Stock Level"
                placeholder="Enter stock level"
                min={1}
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                {...form.getInputProps("description")}
                label="Description"
                placeholder="Enter product description"
                autosize
                minRows={3}
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setImageURL(res[0]?.url ?? "");
                  notifications.show({
                    title: "Success",
                    message: "Image uploaded successfully",
                    color: "green",
                  });
                }}
                onUploadError={(error: Error) => {
                  notifications.show({
                    title: "Error",
                    message: error.message || "Image upload failed",
                    color: "red",
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
            Create Product
          </Button>
        </Stack>
      </form>
    </Card>
  );
};

export default NewProductForm;
