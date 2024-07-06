import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";

const UpdateDialog = ({ isOpen, onClose, onSubmit }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="image">Image</Label>
              <Input id="image" type="file" onChange={handleImageChange} />{" "}
              {selectedImage && (
                <img src={selectedImage} alt="Selected" className="mt-4" />
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                onValueChange={(value) => {
                  setSelectedStatus(value);
                }}
                id="status"
                defaultValue="pending"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <div>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
          <Button type="button" onClick={() => onSubmit(selectedStatus)}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;
