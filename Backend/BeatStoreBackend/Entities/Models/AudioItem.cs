using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class AudioItem
    {
        [Column("AudioItemId")]
        public Guid Id { get; set; }

        [Required(ErrorMessage="Title is a required field.")]
        public string Title { get; set; }

        [Required(ErrorMessage="BPM is a required field.")]
        [Range(0,int.MaxValue)]
        public int Bpm { get; set; }

        [Required(ErrorMessage="Lease price is a required field.")]
        [Range(0,double.MaxValue)]
        public decimal LeasePrice { get; set; }

        [Required(ErrorMessage ="Exclusive price is a required field.")]
        [Range(0,double.MaxValue)]
        public decimal ExclusivePrice { get; set; }

        [Required(ErrorMessage = "Audio URL is a required field.")]
        public string AudioUrl { get; set; }

        [Required(ErrorMessage = "Image URL is a required field.")]
        public string ImageUrl { get; set; }

        public DateTime CreatedAt { get; set; }

        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public AppUser AppUser { get; set; }

        public bool IsBought { get; set; }

        public AudioItem()
        {
            CreatedAt = DateTime.UtcNow;
            IsBought = false;
        }

    }
}
