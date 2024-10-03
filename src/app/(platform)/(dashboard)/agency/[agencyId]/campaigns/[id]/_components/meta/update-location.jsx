"use client"
import { Button } from "@/components/ui/button"
import { FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Home, Pencil } from "lucide-react"
import { useState } from "react"

export function UpdateLocation({ form }) {

  const formLocation = form.getValues().location

  const [showInputs, setShowInputs] = useState(false)
  const [location, setLocation] = useState(formLocation ? `${formLocation.city}, ${formLocation.street}, ${formLocation.zip}` : "")
  const [street, setStreet] = useState(formLocation?.street ?? "")
  const [city, setCity] = useState(formLocation?.city ?? "")
  const [zip, setZip] = useState(formLocation?.zip ?? "")

  function handleCancel() {
    const location = form.getValues().location

    if (!location) {
      setShowInputs(false)
      return
    }

    setStreet(location.street)
    setCity(location.city)
    setZip(location.zip)
    setShowInputs(false)
  }

  function saveLocation() {
    const location = {
      street,
      city,
      zip
    }

    form.setValue("location", location, { shouldDirty: true })
    setLocation(`${street}, ${city}, ${zip}`)
    setShowInputs(false)
  }

  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <FormLabel>
            <div className="flex items-center gap-x-2">
              <Home className="size-4" />
              Location
            </div>
          </FormLabel>
          <Pencil className="size-4" onClick={() => setShowInputs((curr) => !curr)} />
        </div>
        <Input disabled placeholder="No location" value={location} />
      </div>
      {
        showInputs && (
          <>
            <div className="space-y-1">
              <FormLabel>Street</FormLabel>
              <Input value={street} onChange={(e) => setStreet(e.target.value)} />
            </div>
            <div className="space-y-1">
              <FormLabel>City</FormLabel>
              <Input value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="space-y-1">
              <FormLabel>ZIP</FormLabel>
              <Input value={zip} onChange={(e) => setZip(e.target.value)} />
            </div>
            <div className="flex items-center gap-x-2">
              <Button
                type="button"
                variant="primary"
                disabled={!street || !city || !zip}
                onClick={saveLocation}
              >
                Save
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </>
        )
      }
    </div>
  )
}
