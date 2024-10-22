"use client";

import { Button, Dialog, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button color="red">Delete Issue</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Confirm Deletion</Dialog.Title>
        <Dialog.Description>
          Are you sure you want to delete this issue? This action cannot be
          undone.
        </Dialog.Description>
        <Flex mt="4" gap="3">
          <Dialog.Close>
            <Button color="gray" variant="soft">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button
              color="red"
              onClick={async () => {
                await axios.delete("/api/issues/" + issueId);
                router.push("/issues");
                router.refresh();
              }}
            >
              Delete Issue
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DeleteIssueButton;
