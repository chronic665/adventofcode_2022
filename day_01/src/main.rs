use std::env;
use std::fs::File;
use std::io::BufReader;
use std::io::prelude::*;

// run with `cargo run -- input.txt`
fn main() -> std::io::Result<()> {
    let args: Vec<String> = env::args().collect();
    let file_path = &args[1];
    
    let file = File::open(file_path)
        .expect("file not found!");
    let  buf_reader = BufReader::new(file);

    let mut most_calories: u64 = 0;
    let mut elf_number = 1;
    let mut current_elf: Vec<u64> = vec![];
    for l in buf_reader.lines() {
        let line = l.unwrap();
        if !line.is_empty() {
            let calory = line.parse::<u64>().unwrap();
            current_elf.push(calory);
        } else {
            let elf_calories = sum(&current_elf);
            if elf_calories > most_calories {
                most_calories = elf_calories;
                println!("Elf {} has the most calories so far: {}", elf_number, most_calories)
            } else if elf_calories == most_calories {
                println!("Elf {} matches the maximum calories", elf_number);
            }

            elf_number += 1;
            current_elf = vec![];
        }
    }
    println!();
    println!("Most calories: {}", most_calories);
    Ok(())
}

fn sum(elf: &Vec<u64>) -> u64 {
    let mut result: u64 = 0;
    for calory in elf {
        result += calory;
    }
    return result;
}