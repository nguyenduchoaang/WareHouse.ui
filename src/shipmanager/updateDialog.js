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
import { STATUS } from "../based/Constants";
import { useLoading } from "../based/context/LoadingContext";
import { set } from "date-fns";

const UpdateDialog = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { showLoading, hideLoading } = useLoading();
  const [formUpdate, setFormUpdate] = useState({
    image: null,
    status: "SUCCESS",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormUpdate({ ...formUpdate, image: file });
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="image">Image</Label>
              <Input id="image" type="file" onChange={handleImageChange} />{" "}
              {selectedImage && (
                <img
                  style={{ maxWidth: "300px", maxHeight: "400px" }}
                  src={selectedImage}
                  alt="Selected"
                  className="mt-4"
                />
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                onValueChange={(value) => {
                  setFormUpdate({ ...formUpdate, status: value });
                }}
                id="status"
                defaultValue={STATUS[0].label}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS.map((item, index) => (
                    <SelectItem key={index} value={item.label}>
                      {item.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <div>
            <Button type="button" variant="outline" onClick={props.onClose}>
              Cancel
            </Button>
          </div>
          <Button
            type="button"
            onClick={() => {
              props.onSubmit(formUpdate);
              setFormUpdate({
                image: null,
                status: "SUCCESS",
              });
              setSelectedImage(null);
            }}
          >
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;
