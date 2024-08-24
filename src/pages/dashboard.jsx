import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Filter } from "lucide-react";
import { UrlState } from "@/context";
import useFetch from "@/hooks/use-fetch";
import { getClicksForUrls } from "@/db/apiClicks";
import { getUrls } from "@/db/apiUrls";
import Linkcard from "@/components/link-card";
const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = UrlState();
  const {
    loading,
    error,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );
  useEffect(() => {
    fnUrls();
  }, []);
  useEffect(() => {
    if (urls?.length) fnClicks();
    fnUrls();
  }, [urls?.length]);

  const filterUrls = urls?.filter((url) => {
   return url.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex flex-col gap-8">
      {loading ||
        (loadingClicks && <BarLoader width={"100%"} colors="#36d7b7" />)}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <Button>create link</Button>
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className=" absolute top-2 right-2 p-1" />
      </div>
      {error && <Error message={error?.message} />}
      {(filterUrls || []).map((url,i)=>{
return <Linkcard key={i} url={url} fetchUrls={fnUrls}/>;
      })}
    </div>
  );
};

export default Dashboard;
