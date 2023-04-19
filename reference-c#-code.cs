public string EncryptData(string toEncrypt)
{
	byte[] key = Encoding.ASCII.GetBytes(ConvertHexToString({CIPHER_KEY}));
	byte[] iv = Encoding.ASCII.GetBytes(ConvertHexToString({CIPHER_SALT}));
	byte[] data = Encoding.ASCII.GetBytes(toEncrypt);
	byte[] enc = new byte[0];
	
	AesCryptoServiceProvider aes = new AesCryptoServiceProvider
	{
		BlockSize = 128,
		KeySize = 256,
		IV = iv,
		Key = key,
		Mode = CipherMode.CBC,
		Padding = PaddingMode.Zeros
	};
	
	ICryptoTransform ict = aes.CreateEncryptor();
	enc = ict.TransformFinalBlock(data, 0, data.Length);
	return Bin2Hex(enc);
}

public string ConvertHexToString(string HexValue)
{
	string strValue = "";
	while (HexValue.Length > 0)
	{
		strValue += System.Convert.ToChar(System.Convert.ToUInt32(HexValue.Substring(0, 2), 16)).ToString();
		HexValue = HexValue.Substring(2, HexValue.Length - 2);
	}
	return strValue;
}

public string Bin2Hex(byte[] bin)
{
	StringBuilder sb = new StringBuilder(bin.Length * 2);
	foreach (byte b in bin)
	{
		sb.Append(b.ToString("x").PadLeft(2, '0'));
	}
	return sb.ToString();
}



