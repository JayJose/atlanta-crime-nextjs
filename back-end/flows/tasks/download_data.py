def download_data(keyword: str = "COBRA-2022"):
    '''
    Download Atlanta crime data from the Atlanta Police Department website.

    Parameters: A keyword representing all or part of the anchor text of the target file.

    Resources:
    * [Atlanta crime data portal](https://www.atlantapd.org/i-want-to/crime-data-downloads)
            
    Returns: A string of the name of the downloaded file path. Downloaded files are written to `data/landing`.
    '''
    from bs4 import BeautifulSoup
    from datetime import date
    from requests import get 

    root_url = "https://www.atlantapd.org"
    soup_url = root_url + "/i-want-to/crime-data-downloads"
    
    page = get(soup_url)
    soup = BeautifulSoup(page.content, "html.parser")

    contents = soup.find_all("a", class_="content_link")

    for content in contents:
        if keyword in str(content):
            path = content['href']

    download_url = root_url + path

    r = get(download_url)
        
    today = date.today()
    today_ymd = today.strftime("%Y-%m-%d")

    # set file name
    file_name = 'atl-crime_' + today_ymd + '.zip'
    download_path = f"data/landing/{file_name}"

    try:
        open(download_path, "wb").write(r.content)
        print(f"Saved {file_name} to {download_path}.")
        return download_path
    except Exception as err:
        print("Unable to download data from the APD website.")
        print(err)
        

    return None