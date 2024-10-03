"use client"
import { Button } from "@/components/ui/button"
import { FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Home, Pencil } from "lucide-react"
import { useState } from "react"
import { CityInput } from "."

export function UpdateLocation({ form, accessToken }) {

  const formLocation = form.getValues().location

  const [showInputs, setShowInputs] = useState(false)
  const [location, setLocation] = useState(formLocation ? `${formLocation.street}, ${formLocation.city}, ${formLocation.country}, ${formLocation.zip}` : "")
  const [street, setStreet] = useState(formLocation?.street ?? "")
  const [city, setCity] = useState(formLocation?.city ?? "")
  const [state, setState] = useState(formLocation?.state ?? "")
  const [country, setCountry] = useState(formLocation?.country ?? "")
  const [zip, setZip] = useState(formLocation?.zip ?? "")

  function handleCancel() {
    const location = form.getValues().location

    if (!location) {
      setShowInputs(false)
      return
    }

    setStreet(location.street)
    setCity(location.city)
    setCountry(location.country)
    setState(location.state)
    setZip(location.zip)
    setShowInputs(false)
  }

  function saveLocation() {
    const location = {
      street,
      city,
      state,
      country,
      zip
    }

    form.setValue("location", location, { shouldDirty: true })
    setLocation(`${street}, ${city}, ${country}, ${zip}`)
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
              <CityInput
                accessToken={accessToken}
                city={city}
                setCity={setCity}
                setState={setState}
                setCountry={setCountry}
              />
            </div>
            <div className="space-y-1">
              <FormLabel>State</FormLabel>
              <Input placeholder="No state" value={state} disabled />
            </div>
            <div className="space-y-1">
              <FormLabel>Country</FormLabel>
              <Input placeholder="No country" value={country} disabled />
            </div>
            <div className="space-y-1">
              <FormLabel>ZIP</FormLabel>
              <Input value={zip} onChange={(e) => setZip(e.target.value)} />
            </div>
            <div className="flex items-center gap-x-2">
              <Button
                type="button"
                variant="primary"
                disabled={!street || !city || !country || !zip}
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
