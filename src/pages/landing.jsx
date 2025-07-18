import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleShorten = async (e) => {
    e.preventDefault();
    if (!longUrl) {
      setError("Please enter a URL.");
      return;
    }

    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          if (longUrl.includes("invalid")) {
            resolve({
              ok: false,
              json: () => Promise.resolve({ message: "Invalid URL provided." }),
            });
          } else {
            resolve({
              ok: true,
              json: () =>
                Promise.resolve({
                  shortUrl: `https://trimrr.in/${Math.random()
                    .toString(36)
                    .substring(2, 8)}`,
                }),
            });
          }
        }, 800)
      );

      const data = await response.json();

      if (response.ok) {
        setShortUrl(data.shortUrl);
      } else {
        setError(data.message || "Failed to shorten URL. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please check your network.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Short URL copied to clipboard!");
  };

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-16rem)] justify-center py-8 px-4 font-sans">
      <h2 className="mt-12 mb-14 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-foreground text-center font-extrabold leading-tight font-sans">
        The only URL Shortener <br className="hidden sm:inline" />
        you&rsquo;ll ever need! <span className="inline-block animate-bounce">👇</span>
      </h2>

      {/* Main Shortener Card */}
      <div className="w-full max-w-xl bg-card border border-border/40 rounded-2xl shadow-2xl p-10 flex flex-col gap-6">
        <form
          onSubmit={handleShorten}
          className="flex flex-col sm:flex-row w-full gap-4"
        >
          <Input
            type="url"
            placeholder="Enter your loooong URL"
            value={longUrl}
            onChange={e => {
              setLongUrl(e.target.value);
              setError("");
            }}
            className="flex-1 h-12 px-4 py-3 text-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring rounded-xl font-sans"
          />
          <Button
            type="submit"
            variant="default"
            size="default"
            className="h-12 rounded-xl"
            disabled={loading}
          >
            {loading ? "Shortening..." : "Shorten!"}
          </Button>
        </form>

        {error && (
          <p className="text-destructive text-sm mt-2 text-center font-medium">
            {error}
          </p>
        )}

        {shortUrl && (
          <div className="p-4 bg-muted rounded-xl flex flex-col sm:flex-row items-center justify-between border border-border gap-4">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-lg font-medium break-all"
            >
              {shortUrl}
            </a>
            <Button
              onClick={handleCopy}
              variant="secondary"
              size="sm"
              className="h-10 px-5 rounded-lg text-base font-medium"
              type="button"
            >
              Copy
            </Button>
          </div>
        )}
      </div>

      {/* FAQ/Accordion section */}
      <Accordion type="multiple" collapsible className="w-full max-w-2xl mt-10 rounded-xl">
        <AccordionItem value="item-1" className="border-b border-border/40">
          <AccordionTrigger className="text-lg font-medium text-foreground hover:no-underline">
            How does the Trimrr URL shortener work?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            When you enter a long URL, our system generates a shorter version. This shortened URL redirects to your original long URL when accessed.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border-b border-border/40">
          <AccordionTrigger className="text-lg font-medium text-foreground hover:no-underline">
            Do I need an account to use the app?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Yes. Creating an account allows you to manage your URLs, view analytics, and customize your short URLs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="border-b border-border/40">
          <AccordionTrigger className="text-lg font-medium text-foreground hover:no-underline">
            What analytics are available for my shortened URLs?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            You can view the number of clicks, geolocation data of the clicks, and device types (mobile/desktop) for each of your shortened URLs.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LandingPage;
