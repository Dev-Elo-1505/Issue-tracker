"use client";

import { Button, Dialog, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);

  const deleteIssue = async () => {
    try {
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
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
              <Button color="red" onClick={deleteIssue}>
                Delete Issue
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
      <Dialog.Root open={error}>
        <Dialog.Content>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Description>
            This issue can not be deleted.
          </Dialog.Description>
          <Button
            color="gray"
            variant="soft"
            mt="2"
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default DeleteIssueButton;
