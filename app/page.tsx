"use client";
import ConfigProxyCard from "@/components/ConfigProxyCard";
import FileTable from "@/components/FileTable";
import InputProxyCard from "@/components/InputProxyCard";
import ProxyCard from "@/components/ProxyCard";
import WhiteList from "@/components/WhiteList";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [resourceProxies, setResourceProxies] = useState("");
  const [domainRules, setDomainRules] = useState("");
  const [outputProxies, setOutputProxies] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const [resourceResponse, domainResponse, outputResponse] =
        await Promise.all([
          fetch("/api/resource"),
          fetch("/api/rules"),
          fetch("/api/output"),
        ]);

      const resourceData = await resourceResponse.json();
      const domainData = await domainResponse.json();
      const outputData = await outputResponse.json();

      setResourceProxies(resourceData.content);
      setDomainRules(domainData.content);
      setOutputProxies(outputData.content);
    };
    fetchData();
  }, []);

  const handleSaveResourceProxy = async () => {
    const response = await fetch("/api/resource", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newData: resourceProxies,
      }),
    });
    if (response.ok) {
      toast.success("Resource proxy saved successfully");
    } else {
      toast.error("Error saving resource proxy");
    }
  };
  const handleSaveDomainRules = async () => {
    const response = await fetch("/api/rules", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newData: domainRules,
      }),
    });
    if (response.ok) {
      toast.success("Domain rules saved successfully");
    } else {
      toast.error("Error saving domain rules");
    }
  };
  const handleSaveOutputProxy = async () => {
    const response = await fetch("/api/output", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newData: outputProxies,
      }),
    });
    if (response.ok) {
      toast.success("Output proxy saved successfully");
    } else {
      toast.error("Error saving output proxy");
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-gray-200">
        <WhiteList className="col-span-1 w-full" />

        <ConfigProxyCard className="col-span-1 w-full" />
        <InputProxyCard className="col-span-1 w-full" />
        <ProxyCard
          className="col-span-1 w-full"
          title="Resource Proxy"
          value={resourceProxies}
          placeholder="Enter Resource Proxy..."
          onChange={setResourceProxies}
          onSave={handleSaveResourceProxy}
        />
        <ProxyCard
          className="col-span-1 w-full"
          title="Domain Rules"
          value={domainRules}
          placeholder="Enter Domain Rules..."
          onChange={setDomainRules}
          onSave={handleSaveDomainRules}
        />
        <ProxyCard
          className="col-span-1 w-full"
          title="Output Proxy"
          value={outputProxies}
          placeholder="Enter Output Proxy..."
          onChange={setOutputProxies}
          onSave={handleSaveOutputProxy}
        />
        <FileTable />
      </div>
    </>
  );
}
