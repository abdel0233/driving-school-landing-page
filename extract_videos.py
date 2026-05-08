import requests
import re
import sys

def extract_mp4(url):
    try:
        response = requests.get(url, timeout=10)
        # Look for the res.cloudinary.com/... .mp4 pattern
        match = re.search(r'https://res\.cloudinary\.com/[^\"\' ]+\.mp4', response.text)
        if match:
            return match.group(0)
    except Exception as e:
        return f"Error: {e}"
    return "Not found"

if __name__ == "__main__":
    urls = [
        "https://collection.cloudinary.com/dkjsjwzvl/4ef82049d16bdaa802687bfc9b2d45e0",
        "https://collection.cloudinary.com/dkjsjwzvl/801370d7d2499b70e10aa4c91393e3db",
        "https://collection.cloudinary.com/dkjsjwzvl/d3bce150ffe3383ad2d3a464813b5339",
        "https://collection.cloudinary.com/dkjsjwzvl/419f6b1d48a28e9e50e188315f9fd7b5",
        "https://collection.cloudinary.com/dkjsjwzvl/691e37b54df725dbaa640d7863cf5fb4",
        "https://collection.cloudinary.com/dkjsjwzvl/1daf8ff4720b965090adcfd04eed37c9",
        "https://collection.cloudinary.com/dkjsjwzvl/dd7ac8295b0145dae5b7ffbad15285ac",
        "https://collection.cloudinary.com/dkjsjwzvl/c9fbc82b4b15c8eb4573d84be24fe08b",
        "https://collection.cloudinary.com/dkjsjwzvl/4ebbd12c92205006fdab583e7a4a24e5"
    ]
    for i, url in enumerate(urls, 1):
        print(f"Video {i}: {extract_mp4(url)}")
