def unzip_data(file_path: str, target_path: str = "data/active/current_year"):
    """
    Unzip downloaded crime data and move it to the active directory.

    Parameters:
    1. `file_path`: The file path of the most recently downloaded data.
    2. `target_path`: The destination path of the unzipped crime data.

    Returns: None.
    """
    import zipfile

    try:
        with zipfile.ZipFile(file_path, "r") as zip_ref:
            zip_ref.extractall(target_path)
        print(f"Data from {file_path} unzipped and written to {target_path}.")
    except:
        print(f"Unable to unzip the dataset at {file_path}.")
