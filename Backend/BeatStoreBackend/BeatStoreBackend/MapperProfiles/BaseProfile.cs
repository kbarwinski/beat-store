using AutoMapper;
using Entities.DataTransferObjects;
using Entities.Models;

namespace BeatStoreBackend.MapperProfiles
{
    public class BaseProfile : Profile
    {
        public BaseProfile()
        {
            CreateMap<AppUser, AppUserDto>();
            CreateMap<AppUserRegisterDto, AppUser>();

            CreateMap<AudioItem, AudioItemDto>()
            .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(src => src.AppUser.UserName));
            CreateMap<AudioItemInputDto, AudioItem>();
            CreateMap<AudioItemUpdateDto, AudioItem>();

            CreateMap<OrderInputDto, Order>();
            CreateMap<OrderItemDto, OrderItem>();
        }
    }
}
