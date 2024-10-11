namespace ECommerceAPI.ViewModels
{
    public class PorosiaVM
    {
       
        public int NrProdukteve { get; set; }   

        public decimal CmimiTotal { get; set; } // cmimi total me tvsh

        public string Adresa { get; set; }

        public string MetodaPageses { get; set; }

        public string Shteti {  get; set; } 

        public string NrKontaktues { get; set; }    
        public string Qyteti { get; set; }  

        public string ZipKodi { get; set; } 

        public int UserId { get; set; } 

        public List<PorosiaItemVM> Items { get; set; }  

    }

    public class PorosiaItemVM
    {
        public int Sasia { get; set; }  

        public decimal Cmimi { get; set; }     
 
      // public int PorosiaId { get; set; }  

        public int ProduktiId { get; set; } 
    }
}



