"use client";
import ConfigProxyCard from "@/components/ConfigProxyCard";
import FileTable from "@/components/FileTable";
import InputProxyCard from "@/components/InputProxyCard";
import ProxyCard from "@/components/ProxyCard";
import WhiteList from "@/components/WhiteList";
import { useEffect, useState } from "react";

export default function Home() {
  const [resourceProxies, setResourceProxies] = useState("");
  const [domainRules, setDomainRules] = useState("");
  const [outputProxies, setOutputProxies] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const [resourceResponse, domainResponse, outputResponse] = await Promise.all([
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
    await fetch("/api/resource", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newData: resourceProxies,
      }),
    });
  };
  const handleSaveDomainRules = async () => {
    await fetch("/api/rules", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newData: domainRules,
      }),
    });
  };
  const handleSaveOutputProxy = async () => {
    await fetch("/api/output", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newData: outputProxies,
      }),
    });
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-screen p-8 bg-gray-200">
        <WhiteList />

        <ConfigProxyCard />
        <InputProxyCard />
        <ProxyCard
          title="Resource Proxy"
          value={resourceProxies}
          placeholder="Enter Resource Proxy..."
          onChange={setResourceProxies}
          onSave={handleSaveResourceProxy}
        />
        <ProxyCard
          title="Domain Rules"
          value={domainRules}
          placeholder="Enter Domain Rules..."
          onChange={setDomainRules}
          onSave={handleSaveDomainRules}
        />
        <ProxyCard
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
