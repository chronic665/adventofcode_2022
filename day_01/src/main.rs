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

    let mut top_elves: Vec<u64> = vec![];
    let mut current_elf: Vec<u64> = vec![];
    for l in buf_reader.lines() {
        let line = l.unwrap();
        if !line.is_empty() {
            let calory = line.parse::<u64>().unwrap();
            current_elf.push(calory);
        } else {
            let elf_calories = sum(&current_elf);
            top_elves = evaluate_calories(elf_calories, top_elves);

            current_elf = vec![];
        }
    }
    println!("~~~~~~");
    println!("Top Elves: ");
    let total = sum_and_print(&top_elves);
    println!("Total: {}", total);
    Ok(())
}

fn sum(elf: &Vec<u64>) -> u64 {
    let mut result: u64 = 0;
    for calory in elf {
        result += calory;
    }
    return result;
}

fn evaluate_calories(elf_calories: u64, mut top_elves: Vec<u64>) -> Vec<u64> {
    // ordering from highest (index 0) to lowest (index 2)
    for (i, top_calories) in top_elves.iter().enumerate() {
        // new elf has more calories than the current one 
        if elf_calories > *top_calories {
            let mut new_top_elves = top_elves[0..i].to_vec();
            let tail = top_elves[i..top_elves.len()-1].to_vec();
            
            new_top_elves.push(elf_calories);
            new_top_elves.extend(tail);

            println!("Elf is in top 3 of elves so far: rank {} with {} calories", i, elf_calories);
            println!("\tnew top_elves:");
            sum_and_print(&new_top_elves);
            return new_top_elves;
        }
    }

    // initially filling up the top spots
    if top_elves.len() < 3 {
        println!("Elf is in top 3 of elves so far: rank {} with {} calories", top_elves.len(), elf_calories);
        top_elves.push(elf_calories);
    }
    return top_elves;
}

fn sum_and_print(top_elves: &Vec<u64>) -> u64{
    let mut total = 0;
    for elf in top_elves {
        println!("\tcalories: {}", elf);
        total += elf;
    }
    return total;
}