using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.Exceptions;
using ECommerce.Application.OrdersModule.DTOs;
using ECommerce.Application.OrdersModule.Interfaces;
using ECommerce.Application.OrdersModule.ViewModels;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Domain.OrdersModule.Entities;
using ECommerce.Domain.ProduktetModule.Entities;
using ECommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Infrastructure.OrdersModule.Repositories
{
    public class OrdersRepository : IOrdersRepository
    {
        private readonly ECommerceDBContext _context;
        private readonly IProduktiRepository _produktiRepository;
        public OrdersRepository(ECommerceDBContext context,IProduktiRepository produktiRepository)
        {
            _context = context;
            _produktiRepository = produktiRepository;   
        }   

        private async Task<Porosia> CreateOrderOject(PorosiaVM porosia)
        {
            var porosiaObj = new Porosia()
            {
                TotaliProdukteve = porosia.NrProdukteve,
                CmimiTotal = porosia.CmimiTotal,
                NrKontaktues = porosia.NrKontaktues,
                Adresa = porosia.Adresa,
                Shteti = porosia.Shteti,
                Qyteti = porosia.Qyteti,
                ZipKodi = porosia.ZipKodi,
                UserId = porosia.UserId,
                MetodaPageses = porosia.MetodaPageses,
            };

            await _context.Porosia.AddAsync(porosiaObj);
            await _context.SaveChangesAsync();

            return porosiaObj;
        }

        private async Task AddOrderItemsAsync(PorosiaItemVM porosiaItem,int PorosiaID)
        {
            var item = new PorosiaItem()
            {
                SasiaPorositur = porosiaItem.Sasia,
                Cmimi = porosiaItem.Cmimi, 
                Porosia_ID = PorosiaID,
                Produkti_ID = porosiaItem.ProduktiId,
            };


            await _context.PorosiaItem.AddAsync(item);
        }

        private async Task PerditesoStokun(Produkti produkti,int sasiaBlere)
        {
            produkti.SasiaNeStok -= sasiaBlere;
            await _context.SaveChangesAsync();
        }

        public async Task<int> CreateOrderAsync(PorosiaVM porosia)
        {
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {

                    var order = await CreateOrderOject(porosia);

                    foreach (var porosiaItem in porosia.Items)
                    {
                        var productExists = await _produktiRepository.GetByIdAsync(porosiaItem.ProduktiId);
                        //var productExists = await _produktiRepository.GetProduktiFromDbAsync(porosiaItem.ProduktiId);
                        if (productExists == null)
                        {                   
                            throw new OrdersException("Produkti me id " + porosiaItem.ProduktiId + " nuk u gjet ne sistem");
                        }

                        if (productExists.SasiaNeStok < porosiaItem.Sasia)
                        {
                            throw new OrdersException("Produkti me ID " + porosiaItem.ProduktiId + " ka sasi ne stok " + productExists.SasiaNeStok
                                       + ". Kthehu te shporta dhe ule sasine apo largoje nga shporta!");
                        }

                        //validimi me sukses ---> inserto order items ne tabele per porosine si dhe perditeso stokun e produktit !
                        await AddOrderItemsAsync(porosiaItem, order.Porosia_ID);
                        await PerditesoStokun(productExists, porosiaItem.Sasia);
                    }

                await transaction.CommitAsync();
                return order.Porosia_ID;
                }
                catch (OrdersException ex)
                {
                    await transaction.RollbackAsync();
                    throw; // Propagate the exception to be handled by the controller
                }
                catch (Exception) {
                    await transaction.RollbackAsync(); throw;    
                }
            }
        }


        public async Task<Porosia?> GetPorosiaFromDbAsync(int id)
        {
            return await _context.Porosia.FindAsync(id);
        }

        public async Task<ReceiptDetails?> GetReceiptAsnyc(int orderId)
        {
            var order  =  await _context.Porosia
                .Where(p => p.Porosia_ID == orderId)
                .Select(p => new ReceiptDetails
                {
                    PorosiaId = p.Porosia_ID,
                    KlientiEmri = p.User.AspNetUser.UserName,
                    Adresa =  p.Adresa,
                    Shteti = p.Shteti,
                    Qyteti = p.Qyteti,
                    ZipKodi = p.ZipKodi,
                    NrKontaktues =  p.NrKontaktues,
                    DataPorosise = p.DataPorosise,
                    StatusiPorosise = p.Statusi_Porosise,
                    CmimiTotal = p.CmimiTotal,
                    Produktet = p.PorosiaItem.Select(pi => new ReceiptItems
                    {
                        SasiaPorositur = pi.SasiaPorositur,
                        Cmimi = pi.Cmimi,
                        EmriProdukti =  pi.Produkti.EmriProdukti,
                        FotoProduktit =  pi.Produkti.FotoProduktit,

                    }).ToList(),

                })
                .FirstOrDefaultAsync();
            return order;
        }


        public async Task<List<OrderDTO>> GetAllOrdersAsync()
        {
           var porosite = await
           _context.Porosia
           .OrderByDescending(p => p.DataPorosise)
           .Select(p => new OrderDTO
           {
               PorosiaID = p.Porosia_ID,
               KlientiId = p.UserId,
               Klienti = p.User.AspNetUser.UserName,
               DataPorosise =  p.DataPorosise,
               Totali = p.CmimiTotal,
               AdresaDerguese = new AdresaDerguese
               {
                  Adresa =  p.Adresa,
                  Qyteti =  p.Qyteti,
                  ZipKodi = p.ZipKodi,
                  Shteti = p.Shteti
               },
               Statusi = p.Statusi_Porosise,
               MetodaPageses = p.MetodaPageses,
               DetajetPorosise = p.PorosiaItem.Select(pi => new OrderDetails
               {

                   ProduktiID = pi.Produkti_ID,
                   ProduktiEmri = pi.Produkti.EmriProdukti,
                   Foto = pi.Produkti.FotoProduktit,
                   Sasia = pi.SasiaPorositur,
                   Cmimi =  pi.Cmimi
               }).ToList()

           }).ToListAsync();

            return porosite;
            
        }

        public async Task<List<UserOrderDTO>> GetOrdersByUserIdAsync(int userId)
        {

            var porosite = await
              _context.Porosia
              .OrderByDescending(p => p.DataPorosise)
              .Where(p => p.UserId == userId)
              .Select(p => new UserOrderDTO
              {
                  PorosiaID = p.Porosia_ID,
                  DataPorosise = p.DataPorosise,
                  Totali = p.CmimiTotal,
                  MetodaPageses = p.MetodaPageses,
                  AdresaDerguese = new AdresaDerguese
                  {
                      Adresa = p.Adresa,
                      Qyteti = p.Qyteti,
                      ZipKodi = p.ZipKodi,
                      Shteti  =p.Shteti
                  },
                  Statusi = p.Statusi_Porosise,

              }).ToListAsync();

            return porosite;
        }

        public async Task UpdateOrderStatusAsync(Porosia porosia,string statusi)
        {
            porosia.Statusi_Porosise = statusi;
            _context.Update(porosia);
            await _context.SaveChangesAsync();
        }

    }
}

